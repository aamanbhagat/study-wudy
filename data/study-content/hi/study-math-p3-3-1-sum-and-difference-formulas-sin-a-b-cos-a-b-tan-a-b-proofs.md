## 1. The one-sentence answer
**The sum and difference formulas give exact algebraic expressions for sin(A±B), cos(A±B) and tan(A±B) using only the individual values of sin A, sin B, cos A, cos B and tan A, tan B.**

These identities arise because angles combine linearly on the unit circle while the coordinates of the resulting point are products of sines and cosines. Once proved, they replace every occurrence of a compound angle with separate angles whose values you already know. The proofs rest on the distance formula between two points whose arguments differ by A+B or A−B; equating squared distances immediately produces the cosine addition formula, after which the others follow by co-function identities.

> [!NOTE]
> The single deepest insight is that rotation by A followed by rotation by B is the same linear transformation as rotation by A+B; the matrix product of the two rotation matrices yields exactly the entries sin(A+B) and cos(A+B).

## 2. Why this matters — concrete and current
In phased-array radar used by SpaceX’s Starlink satellites, beam steering angles are sums of many small phase shifts; the sum formulas let engineers compute the composite far-field amplitude without numerical integration at every time step.  
In semiconductor lithography, ASML’s EUV scanners align masks using interference fringes whose intensity depends on cos(Δθ) where Δθ is the sum of several mirror-tilt angles; closed-form expressions allow real-time correction of overlay errors below 1 nm.  
In inertial navigation systems on Boeing 787 aircraft, the direction cosine matrix that transforms body-frame accelerations to ECEF coordinates is updated by multiplying successive small-angle rotation matrices; the resulting entries are precisely the sin and cos of summed Euler angles.  
In Fourier analysis performed by NVIDIA’s cuFFT library, the twiddle factors e^{i(k+m)θ} are rewritten via the angle-addition formula so that a single complex multiplication replaces two separate sine/cosine calls, cutting kernel latency by roughly 30 %.  
In quantum-computing control, IBM’s cross-resonance gates accumulate conditional phase A+B; the sin((A+B)/2) term that appears in the effective Hamiltonian must be evaluated analytically during pulse calibration to keep gate fidelity above 99.9 %.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Unit-circle definitions of sin and cos | All proofs begin by placing angles on the unit circle and reading off coordinates. |
| Distance formula in ℝ²   | Equating squared Euclidean distances between rotated points produces the cosine addition identity. |
| Pythagorean identity     | Used to obtain sin²θ + cos²θ = 1 after the cosine formula is proved. |
| Co-function identities   | sin(π/2 − θ) = cos θ converts addition formulas into subtraction formulas. |

If any row is unfamiliar, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Place two angles on the unit circle
Imagine two radii at angles A and B measured from the positive x-axis. Their terminal points are P = (cos A, sin A) and Q = (cos B, sin B). The chord length PQ depends only on the absolute difference |A − B|.

### Step 2 — Write the squared distance explicitly
Apply the distance formula:
$$
PQ^2 = (\cos A - \cos B)^2 + (\sin A - \sin B)^2.
$$
Expand the right-hand side and replace every occurrence of sin² + cos² by 1; the expression collapses to
$$
PQ^2 = 2 - 2\cos A\cos B - 2\sin A\sin B.
$$

### Step 3 — Equate to the chord length for angle difference
The same chord subtends central angle |A − B|, so the identical distance is also
$$
PQ^2 = 2 - 2\cos(A - B).
$$
Equating the two expressions immediately yields the cosine difference formula
$$
\cos(A - B) = \cos A\cos B + \sin A\sin B.
$$

> [!WARNING]
> If the algebraic expansion in Step 2 drops a minus sign, the final identity will contain an erroneous “−” instead of “+”, breaking every later identity that depends on it.

### Step 4 — Obtain the cosine sum formula by substitution
Replace B by −B. Because cosine is even and sine is odd,
$$
\cos(A + B) = \cos A\cos(-B) - \sin A\sin(-B) = \cos A\cos B + \sin A\sin B.
$$

### Step 5 — Derive the sine formulas via co-function identities
Write sin θ = cos(π/2 − θ) and apply the cosine formulas already proved:
$$
\sin(A + B) = \cos\bigl(\tfrac{\pi}{2} - (A + B)\bigr) = \cos(\tfrac{\pi}{2} - A)\cos B - \sin(\tfrac{\pi}{2} - A)\sin B,
$$
which simplifies to the standard sine addition formula. The subtraction case follows analogously.

### Step 6 — Obtain the tangent formulas by division
Divide the sine addition formula by the cosine addition formula and factor:
$$
\tan(A + B) = \frac{\sin(A + B)}{\cos(A + B)} = \frac{\tan A + \tan B}{1 - \tan A\tan B}.
$$
The subtraction version is obtained the same way.

### Step 7 — State the complete set
All six identities now stand on a single geometric fact (chord length) plus the parity properties of sine and cosine.

## 5. Worked examples — har step show karo

**Example 1 — Evaluate sin 75° exactly**  
*Given:* 75° = 45° + 30°.  
*Find:* sin 75°.  
Apply the sine addition formula directly:  
$$
\sin(45^\circ + 30^\circ) = \sin 45^\circ\cos 30^\circ + \cos 45^\circ\sin 30^\circ.
$$  
Substitute known values √2/2 and √3/2:  
$$
= \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2}\cdot\frac{1}{2} = \frac{\sqrt{6} + \sqrt{2}}{4}.
$$  
*Why* each substitution works: the formula was already proved for arbitrary A and B, so the numerical angles are merely instances.  
**Final answer**  
$$\frac{\sqrt{6}+\sqrt{2}}{4}$$

*Reflection:* The example is straightforward once the formula is trusted; the only algebraic risk is forgetting to factor 1/4.

**Example 2 — Prove cos(π − θ) = −cos θ**  
*Given:* Use the cosine difference formula with A = π, B = θ.  
*Find:* cos(π − θ).  
$$
\cos(\pi - \theta) = \cos\pi\cos\theta + \sin\pi\sin\theta = (-1)\cos\theta + (0)\sin\theta = -\cos\theta.
$$  
*Why* the substitution is valid: π is a legitimate angle, and the formula holds for all real numbers.  
**Final answer**  
$$-\cos\theta$$

*Reflection:* This shows how the addition formulas generate all supplementary-angle identities without memorising extra lists.

**Example 3 — Simplify tan(α + β) when tan α = 3 and tan β = 2**  
*Given:* tan α = 3, tan β = 2.  
*Find:* tan(α + β).  
Use the tangent addition formula:  
$$
\tan(\alpha + \beta) = \frac{3+2}{1-3\cdot2} = \frac{5}{1-6} = \frac{5}{-5} = -1.
$$  
*Why* the denominator is formed that way: it is exactly the algebraic rearrangement of the sine-over-cosine ratio proved in Step 6.  
**Final answer**  
**-1**

*Reflection:* Notice that the result is exact; no calculator or approximation is required.

**Example 4 — Find sin(A + B) given sin A = 3/5, cos B = 5/13, both angles acute**  
*Given:* sin A = 3/5 ⇒ cos A = 4/5; cos B = 5/13 ⇒ sin B = 12/13.  
*Find:* sin(A + B).  
Apply the sine addition formula:  
$$
\sin(A + B) = \sin A\cos B + \cos A\sin B = \frac{3}{5}\cdot\frac{5}{13} + \frac{4}{5}\cdot\frac{12}{13} = \frac{3+48}{65} = \frac{51}{65}.
$$  
*Why* each fraction appears: the missing cosine and sine are obtained from the Pythagorean identity in the respective right triangles.  
**Final answer**  
$$\frac{51}{65}$$

*Reflection:* The example forces simultaneous use of the Pythagorean identity and the addition formula, revealing how the two prerequisites interact.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Writing cos(A + B) = cos A cos B − sin A sin B as cos A cos B + sin A sin B | Sign error when replacing B by −B           | Always verify the even/odd property of cosine first  |
| Forgetting that tan(A − B) has “+” in the denominator | Confusion between addition and subtraction cases | Memorise the single pattern “1 ∓ tan A tan B”        |
| Applying the formulas when one angle is 90° without checking domain | Division by zero in tangent version         | Check cos(A ± B) ≠ 0 before using tan formula        |
| Using degree mode on calculator after deriving exact radical answers | Mixed symbolic/numeric workflow             | Keep symbolic until the very last numerical step     |
| Assuming sin(A + B) = sin A + sin B | Over-generalising linearity                 | Immediately test with A = B = 90° to see contradiction |
| Losing the factor 1/2 when deriving half-angle formulas later | Premature cancellation in double-angle step | Keep the addition formula intact until substitution  |
| Sign flip when A − B is negative  | Forgetting cosine is even                   | Replace A − B by B − A and apply cos(−x) = cos x     |

## 7. The textbook-precise statement
Let A, B ∈ ℝ. Then  
$$
\sin(A+B)=\sin A\cos B+\cos A\sin B,\qquad
\sin(A-B)=\sin A\cos B-\cos A\sin B,
$$
$$
\cos(A+B)=\cos A\cos B-\sin A\sin B,\qquad
\cos(A-B)=\cos A\cos B+\sin A\sin B,
$$
and, whenever the expressions are defined,
$$
\tan(A+B)=\frac{\tan A+\tan B}{1-\tan A\tan B},\qquad
\tan(A-B)=\frac{\tan A-\tan B}{1+\tan A\tan B}.
$$
(Sullivan, *Precalculus*, 11e, §7.2, Theorem 1.)

## 8. Visual — diagram or schematic
```
Unit circle, origin O
P: (cos A, sin A)   angle A from +x
Q: (cos B, sin B)   angle B from +x
R: (cos(A+B), sin(A+B))   terminal point after combined angle
Chord PQ length equals chord between 1 and angle |A-B|
Vector rotation: (cos A, −sin A; sin A, cos A) multiplied by (cos B, −sin B; sin B, cos B) yields rotation matrix for A+B
```

## 9. The memory technique

1. **The hook**  
   Picture two dancers spinning on a clock face; the final position’s height is “sin of the sum” only when you add the cross terms exactly as the distance formula demands.

2. **What to overlearn**  
   - cos(A − B) = cos A cos B + sin A sin B (the “plus” version)  
   - sin(A + B) = sin A cos B + cos A sin B  
   - tan(A + B) = (tan A + tan B)/(1 − tan A tan B)

3. **Spaced-repetition schedule**  
   Review the three identities after 1 day, 3 days, 7 days, 16 days and 35 days.

4. **First-principles fallback**  
   Return to the unit-circle chord argument: recompute PQ² two ways and equate; every other formula follows by parity or division.

## 10. What this unlocks
These identities are the gateway to product-to-sum conversions, multiple-angle formulas, trigonometric integration, and Fourier analysis.  
- Double-angle and half-angle formulas are immediate special cases.  
- Linear combination a sin θ + b cos θ can be rewritten as R sin(θ + ϕ).  
- Integration of rational functions of sine and cosine becomes feasible via the Weierstrass substitution.  
- Characteristic equations of linear recurrence relations with constant coefficients acquire closed-form solutions when roots are complex.

## 11. Self-check — five questions, no answers
1. Using only the addition formulas, prove that cos(3θ) = 4cos³θ − 3cosθ.  
2. Evaluate tan 105° in simplest radical form.  
3. If sin A = 5/13 and cos B = 3/5 with A, B acute, compute sin(A − B).  
4. Identify the algebraic error in the false claim “sin(A + B) + sin(A − B) = 2 sin A cos B” and correct it.  
5. Derive the formula for sin(A + B + C) by treating (A + B) as a single angle and then adding C; state the fully expanded expression.